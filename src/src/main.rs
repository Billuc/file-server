use axum::response::Html;
use axum::{Router, routing::get};
use rusqlite::Connection;
use std::collections::HashMap;
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::sync::Mutex;

mod keys;
mod templates;

static EXAMPLE_TEMPLATE: &str = include_str!("../templates/example.html");

#[tokio::main]
async fn main() {
    // Initialize SQLite database
    let db = Connection::open_in_memory().expect("Failed to open SQLite database");
    db.execute(
        "CREATE TABLE IF NOT EXISTS keys (
            id INTEGER PRIMARY KEY,
            key TEXT NOT NULL
        )",
        [],
    )
    .expect("Failed to create table");

    let shared_db = Arc::new(Mutex::new(db));

    // Build the application with routes
    let app = Router::new()
        .route("/", get(home_handler))
        .route("/keys", get(keys::keys_handler).post(keys::add_key_handler))
        .route("/blob/{id}", get(blob_handler))
        .with_state(shared_db);

    // Run the server
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Listening on http://{}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    let _ = axum::serve(listener, app).await;
}

async fn home_handler() -> Html<String> {
    let mut context = HashMap::new();
    context.insert("title", "Home Page");
    context.insert("header", "Welcome to the Home Page");
    context.insert("content", "This is the home page content.");

    let rendered = templates::render_template(EXAMPLE_TEMPLATE, context);
    Html(rendered)
}

async fn blob_handler() -> Html<String> {
    let mut context = HashMap::new();
    context.insert("title", "Blob Page");
    context.insert("header", "Blob");
    context.insert(
        "content",
        "<pre>Code Section</pre><button>Download</button>",
    );

    let rendered = templates::render_template(EXAMPLE_TEMPLATE, context);
    Html(rendered)
}
