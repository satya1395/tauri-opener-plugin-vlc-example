// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

/* fn main() {
  app_lib::run();
} */
fn main() {
  tauri::Builder::default()
      .plugin(tauri_plugin_opener::init())
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
