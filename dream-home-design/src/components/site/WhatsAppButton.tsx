const WHATSAPP_NUMBER = "919557930504";
const WHATSAPP_MESSAGE = "Hi, I want to know more about NextGen Living Space interiors.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_34px_-14px_rgba(15,23,42,0.7)] transition hover:scale-105 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 md:bottom-7 md:right-7"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-8 w-8"
        fill="currentColor"
      >
        <path d="M16.04 4C9.42 4 4.04 9.37 4.04 15.98c0 2.11.55 4.17 1.61 5.98L4 28l6.19-1.62a11.95 11.95 0 0 0 5.84 1.49h.01c6.61 0 11.99-5.37 11.99-11.98C28.03 9.37 22.65 4 16.04 4Zm0 21.84h-.01c-1.78 0-3.52-.48-5.05-1.38l-.36-.21-3.67.96.98-3.58-.23-.37a9.87 9.87 0 0 1-1.51-5.28c0-5.48 4.46-9.94 9.95-9.94 2.66 0 5.16 1.04 7.04 2.91a9.87 9.87 0 0 1 2.91 7.03c0 5.48-4.46 9.86-10.04 9.86Zm5.45-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.23 1.36.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
