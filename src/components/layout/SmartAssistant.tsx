const WHATSAPP_NUMBER = '917079917079'; // +91 7079917079, no punctuation (wa.me format)

// Direct WhatsApp click-to-chat — replaces the earlier fake "Smart AI"
// popup (canned nav shortcuts, no real assistant behind it) with a real,
// working contact channel.
export const SmartAssistant = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp: +91 70799 17079"
    title="Chat with us on WhatsApp: +91 70799 17079"
    className="fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 bg-[#25D366] hover:scale-110"
  >
    <svg viewBox="0 0 32 32" width="32" height="32" fill="white" aria-hidden="true">
      <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.42.68 4.68 1.86 6.6L3 29l7.09-2.31a12.44 12.44 0 0 0 5.91 1.5h.005c6.905 0 12.5-5.596 12.5-12.5S22.906 3 16.001 3Zm0 22.77h-.004a10.36 10.36 0 0 1-5.28-1.45l-.379-.225-3.93 1.28.98-3.93-.246-.394a10.28 10.28 0 0 1-1.582-5.55c0-5.7 4.64-10.34 10.345-10.34 2.763 0 5.36 1.077 7.315 3.033a10.28 10.28 0 0 1 3.03 7.317c0 5.7-4.64 10.34-10.25 10.34Zm5.665-7.75c-.31-.155-1.834-.905-2.118-1.008-.284-.104-.492-.155-.699.155-.207.31-.802 1.008-.984 1.215-.181.207-.362.233-.673.078-.31-.155-1.31-.483-2.495-1.54-.923-.823-1.546-1.84-1.728-2.15-.181-.31-.02-.478.136-.632.14-.14.31-.362.465-.543.155-.181.207-.31.31-.518.104-.207.052-.388-.026-.543-.078-.155-.699-1.684-.958-2.306-.252-.605-.508-.523-.699-.533l-.595-.01c-.207 0-.543.078-.828.388-.284.31-1.086 1.061-1.086 2.588 0 1.527 1.112 3.003 1.267 3.21.155.207 2.19 3.343 5.306 4.688.741.32 1.319.511 1.77.654.744.237 1.421.203 1.957.123.597-.089 1.834-.75 2.093-1.474.259-.724.259-1.345.181-1.474-.078-.13-.284-.207-.595-.362Z" />
    </svg>
  </a>
);
