export default function BackgroundMusic() {
    return (
      <audio autoPlay loop>
        <source src="../public/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    );
  }
  