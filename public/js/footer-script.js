document.addEventListener('DOMContentLoaded', function () {
  const messages = [
    '🚀 This footer was coded at 3 AM on a dare. No regrets... maybe.',
    '🐛 Our code’s bug count is lower than our coffee intake. (That’s saying something.)',
    '💾 If this footer vanishes, try turning reality off and on again.',
    '⚠️ 404: Witty footer message not found... just kidding, we found it!',
    '🎮 Achievement Unlocked: You discovered the secret footer!',
    '🕹️ Press F to pay respects—yes, even to our footer.',
    '☕ Powered by coffee, bad puns, and the occasional existential crisis.',
    '🤷 You scrolled all the way down here... congratulations, you win!',
    '📞 For support, please whisper your problems to this footer. It listens.',
    '🎲 This footer is 100% RNG-based and 0% responsible.',
    '😂 Warning: Excessive reading of footer messages may cause uncontrollable laughter.',
    '🤔 This footer was brought to you by the letter F for ‘Fabulously funny!’',
    '😎 Our footer is cooler than your ex’s excuses.',
    '🔥 If this footer were any hotter, it’d be breaking the internet.',
    '🦸 Not all heroes wear capes—some just write hilarious footer messages.',
    '💡 Light bulb moment: This footer brightens your day, one pun at a time.',
    '🚨 Alert: Footer humor ahead. Brace yourself for awesomeness!',
    '🌌 In a universe of headers, be a footer. Stay grounded, my friend.',
    '🤫 Psst... the footer knows what you did last scroll.',
    '🎉 Congrats! You’ve reached the end—where the magic (and jokes) live.',
    "👾 This footer's so good, it's out of this world. (Literally, it's from Mars.)",
  ]

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
  const footerMsgElement = document.getElementById('footer-message')
  if (footerMsgElement) {
    footerMsgElement.textContent = randomMessage
  }
})
