let context: AudioContext | undefined
const buffers = new Map<string, Promise<AudioBuffer>>()

function audio(): AudioContext {
  context ??= new AudioContext()
  return context
}

function decode(dataUri: string): Promise<AudioBuffer> {
  let buffer = buffers.get(dataUri)
  if (!buffer) {
    const bytes = Uint8Array.from(atob(dataUri.split(',')[1] ?? ''), (c) =>
      c.charCodeAt(0),
    )
    buffer = audio().decodeAudioData(bytes.buffer)
    buffers.set(dataUri, buffer)
  }
  return buffer
}

/**
 * Play a short base64 data-URI clip through Web Audio. Stays silent when the
 * browser blocks audio.
 */
export async function playSound(dataUri: string, volume = 1): Promise<void> {
  try {
    const ctx = audio()
    if (ctx.state === 'suspended') await ctx.resume()
    const source = ctx.createBufferSource()
    const gain = ctx.createGain()
    source.buffer = await decode(dataUri)
    gain.gain.value = volume
    source.connect(gain).connect(ctx.destination)
    source.start(0)
  } catch {
    // Autoplay policy or decode failure: stay silent.
  }
}
