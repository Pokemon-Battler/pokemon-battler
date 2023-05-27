'use client'

import { useAudio } from 'react-use'

import {
    RxSpeakerOff,
    RxSpeakerQuiet,
    RxSpeakerModerate,
    RxSpeakerLoud,
} from 'react-icons/rx'

import { HiPlay, HiStop } from 'react-icons/hi2'

import { useEffect, useState } from 'react'

// import { gen1, gen2, gen3, gen4, gen5, gen6, gen7, gen8 } from '../audio'

const trackNames = [
    'Gen 1 - Kanto',
    'Gen 2 - Johto',
    'Gen 3 - Hoenn',
    'Gen 4 - Sinnoh',
    'Gen 5 - Unova',
    'Gen 6 - Kalos',
    'Gen 7 - Alola',
    'Gen 8 - Galar',
]

const AudioPlayer = () => {
    const [audio, state, controls, ref] = useAudio({
        src: '/audio/gen1.mp3',
        autoPlay: false, // very inconsistent. not sure why
    })

    const [volumeLevel, setVolumeLevel] = useState(2) // 0 is off, 3 is maximum

    const handleSpeakerClick = (e) => {
        switch ((volumeLevel + 1) % 4) {
            case 0:
                controls.volume(0)
                break
            case 1:
                controls.volume(0.1)
                break
            case 2:
                controls.volume(0.5)
                break
            case 3:
                controls.volume(1)
        }
        setVolumeLevel((prevVolumeLevel) => (prevVolumeLevel + 1) % 4)
    }

    const setAudioSrc = (trackname) => {
        let path = process.env.PUBLIC_URL || 'http://localhost:3000'
        let fullUrl = path + '/audio/' + trackname
        // console.log(fullUrl)

        ref.current.src = fullUrl
    }


    const handleTrackSelect = (e) => {
        let trackName = e.target.value

        // convert displayed track name to mp3 title for example 'Gen 1 - Kanto' -> 'gen1'
        trackName = trackName.toLowerCase().replace(/ /g, '').split('-')[0] 
        // console.log(trackName)
        trackName += '.mp3'

        setAudioSrc(trackName)

        controls.play()
        // console.log(ref.current)
    }

    const speakerIcon = () => {
        let size = 30

        switch (volumeLevel) {
            case 0:
                return <RxSpeakerOff size={size} />
            case 1:
                return <RxSpeakerQuiet size={size} />
            case 2:
                return <RxSpeakerModerate size={size} />
            case 3:
                return <RxSpeakerLoud size={size} />
        }
    }

    const handlePlayButton = () => {
        if (state.playing) {
            controls.pause()
            controls.seek(0) // set playhead back to the start
        } else {
            controls.play()
        }
    }

    
    useEffect(() => {
        // console.log(state)
        // console.log(ref.current)

        setAudioSrc('gen6.mp3')
    }, [])

    return (
        <div id='audio-player' className='flex items-center gap-1 p-4'>
            {audio}

            {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}

            {/* <button onClick={controls.pause}>Pause</button> */}

            <button
                onClick={handlePlayButton}
                // ref={playButtonRef}
                className='px-2 py-1 text-sm text-orange text-orange-600 border border-orange-600 rounded bg-transparent '
            >
                {state.playing ? <HiStop size={20} /> : <HiPlay size={20} />}
            </button>

            <select
                onChange={handleTrackSelect}
                name='trackName'
                defaultValue='Gen 6 - Kalos'
                className='p-0 py-1 pl-2 text-orange-600 text-sm border border-orange-600/50 rounded bg-transparent min-w-[110px] focus:outline-none focus:ring-0  focus:border-orange-600'
            >
                {trackNames.map((trackName, index) => (
                    <option
                        value={trackName}
                        className='text-black bg-transparent'
                        key={index}
                    >
                        {trackName}{' '}
                    </option>
                ))}
            </select>

            <button
                onClick={() => handleSpeakerClick()}
                // style={{ color: 'orange' }}
                className='ml-2 text-orange-600'
            >
                {speakerIcon()}
            </button>
        </div>
    )
}
export default AudioPlayer
