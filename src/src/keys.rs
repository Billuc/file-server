use axum::extract::Form;
use axum::response::Html;
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};
use std::fs;

use crate::templates::render_template;

static KEYS_FILE: &str = "keys.json";
static KEYS_CONTAINER_TEMPLATE: &str = include_str!("../templates/keys_container.html");
static KEYS_TEMPLATE: &str = include_str!("../templates/keys.html");

#[derive(Serialize, Deserialize)]
pub struct Keys {
    nouns: HashMap<String, String>,      // Key -> Subcategory
    adjectives: HashMap<String, String>, // Key -> Subcategory
}

impl Keys {
    fn new() -> Self {
        Self {
            nouns: HashMap::new(),
            adjectives: HashMap::new(),
        }
    }

    fn add_key(&mut self, category: &str, key: &str, subcategory: &str) {
        let target = match category {
            "nouns" => &mut self.nouns,
            "adjectives" => &mut self.adjectives,
            _ => return,
        };

        target.insert(key.to_string(), subcategory.to_string());
    }

    fn get_subcategories(&self, category: &str) -> HashSet<String> {
        let target = match category {
            "nouns" => &self.nouns,
            "adjectives" => &self.adjectives,
            _ => return HashSet::new(),
        };

        target.values().cloned().collect()
    }

    fn contains(&self, key: &str) -> bool {
        self.nouns.contains_key(key) || self.adjectives.contains_key(key)
    }
}

#[derive(Deserialize)]
pub struct KeyForm {
    key: String,
    category: String,
    subcategory: Option<String>,
}

pub enum Feedback {
    Success(String),
    Error(String),
}

pub fn render_keys_container(keys: Keys, feedback: Option<Feedback>) -> String {
    let mut context = HashMap::new();

    // Generate HTML to display keys
    let nouns_keys_list = keys
        .nouns
        .keys()
        .chain(keys.adjectives.keys())
        .map(|key| format!("<li>{}</li>", key))
        .collect::<Vec<_>>()
        .join("");

    let adjectives_keys_list = keys
        .adjectives
        .keys()
        .map(|key| format!("<li>{}</li>", key))
        .collect::<Vec<_>>()
        .join("");

    context.insert("noun_keys_list", nouns_keys_list.as_str());
    context.insert("adjective_keys_list", adjectives_keys_list.as_str());

    let mut feedback_message = String::new();
    match feedback {
        Some(Feedback::Success(message)) => {
            feedback_message = message.clone();
            context.insert("color", "green");
        }
        Some(Feedback::Error(message)) => {
            feedback_message = message.clone();
            context.insert("color", "red");
        }
        None => {
            context.insert("color", "black");
        }
    };
    context.insert("feedback", feedback_message.as_str());

    render_template(KEYS_CONTAINER_TEMPLATE, context)
}

fn read_keys_from_file() -> Keys {
    if let Ok(data) = fs::read_to_string(KEYS_FILE) {
        serde_json::from_str(&data).unwrap_or_else(|_| Keys::new())
    } else {
        Keys::new()
    }
}

pub async fn add_key_handler(Form(payload): Form<KeyForm>) -> Html<String> {
    // Read existing keys from the JSON file
    let mut keys: Keys = read_keys_from_file();

    // Check for duplicates
    let feedback = if keys.contains(&payload.key) {
        Feedback::Error("Key already exists!".to_string())
    } else {
        // Add the new key
        keys.add_key(
            &payload.category,
            &payload.key,
            &payload.subcategory.unwrap_or("".to_string()),
        );

        // Save updated keys back to the JSON file
        fs::write(KEYS_FILE, serde_json::to_string(&keys).unwrap())
            .expect("Failed to write to file");

        Feedback::Success("Key added successfully!".to_string())
    };

    let rendered = render_keys_container(keys, Some(feedback));
    Html(rendered)
}

pub async fn keys_handler() -> Html<String> {
    // Read existing keys from the JSON file
    let keys: Keys = read_keys_from_file();

    let mut context = HashMap::new();

    // Generate subcategory options for the default category (e.g., nouns)
    let nouns_subcategory_options = keys
        .get_subcategories("nouns")
        .iter()
        .map(|subcategory| format!("<option value=\"{}\">{}</option>", subcategory, subcategory))
        .collect::<Vec<_>>();
    let adjectives_subcategory_options = keys
        .get_subcategories("adjectives")
        .iter()
        .map(|subcategory| format!("<option value=\"{}\">{}</option>", subcategory, subcategory))
        .collect::<Vec<_>>();

    let subcategory_options = format!(
        "<optgroup label=\"Nouns\">{}</optgroup><optgroup label=\"Adjectives\">{}</optgroup>",
        nouns_subcategory_options.join(""),
        adjectives_subcategory_options.join("")
    );

    context.insert("subcategory_options", subcategory_options.as_str());

    let keys_container = render_keys_container(keys, None);
    context.insert("keys_container", keys_container.as_str());

    let rendered = render_template(KEYS_TEMPLATE, context);
    Html(rendered)
}
