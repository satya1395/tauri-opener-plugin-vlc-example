use vlc_rs::{Instance, Media, MediaPlayer};
use std::sync::Mutex;
use std::sync::Arc;

pub struct VideoPlayerState {
    instance: Instance,
    player: MediaPlayer,
}

impl VideoPlayerState {
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        let instance = Instance::new()?;
        let player = MediaPlayer::new(&instance)?;
        
        Ok(Self {
            instance,
            player,
        })
    }

    pub fn play_url(&self, url: &str) -> Result<(), Box<dyn std::error::Error>> {
        let media = Media::new_location(&self.instance, url)?;
        self.player.set_media(&media);
        self.player.play()?;
        Ok(())
    }

    pub fn stop(&self) -> Result<(), Box<dyn std::error::Error>> {
        self.player.stop()?;
        Ok(())
    }
}

// Wrap the state in an Arc<Mutex> for thread-safe access
pub type SafeVideoPlayer = Arc<Mutex<VideoPlayerState>>;
