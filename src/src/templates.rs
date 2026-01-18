use std::collections::HashMap;

pub fn render_template(template: &str, context: HashMap<&str, &str>) -> String {
    let mut rendered = template.to_string();

    for (key, value) in context {
        let placeholder = format!("{{{{{}}}}}", key);
        rendered = rendered.replace(&placeholder, value);
    }

    rendered
}
