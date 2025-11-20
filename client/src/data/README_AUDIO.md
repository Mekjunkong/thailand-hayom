# Audio Features Documentation

## Overview
The interactive lessons now include comprehensive audio enhancements:

1. **Background Music**: Ambient music for each lesson theme
2. **Lesson Introductions**: Text-to-speech in English and Hebrew
3. **Thai Pronunciation**: Web Speech API for phrase pronunciation

## Implementation

### Background Music
- Each lesson has a unique background music track
- Users can toggle music on/off with a button
- Volume control slider (0-100%)
- Music loops continuously during the lesson

### Lesson Introductions
- Bilingual intro text (English + Hebrew)
- Text-to-speech playback in both languages
- Displayed in a modal at lesson start
- Can be dismissed to start the lesson

### Thai Pronunciation
- Uses Web Speech API with Thai language (th-TH)
- Slower rate (0.7x) for learning
- Plays when user clicks the pronunciation button

## Files Modified
- `/client/src/components/InteractiveLessonPlayer.tsx` - Added audio controls and intro modal
- `/client/src/data/lessonsDataWithAudio.ts` - Audio data and helper functions
- `/client/src/pages/InteractiveLessons.tsx` - Integrated audio-enhanced lessons

## Usage
Users can:
1. Listen to lesson introduction in English or Hebrew
2. Toggle background music on/off
3. Adjust background music volume
4. Hear Thai pronunciation for each phrase
