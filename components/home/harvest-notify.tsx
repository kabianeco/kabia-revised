import { NotifyForm } from "@/components/home/notify-form";

/**
 * Satış öncesi en önemli bant: hasat açılışını duyurmak için e-posta
 * toplar. Kayıtlar iletişim gelen kutusuna düşer; lansman günü gönderim
 * listesi hazır olur.
 */
export function HarvestNotify() {
  return (
    <section
      aria-labelledby="notify-heading"
      className="border-t border-ink/10 bg-paper"
    >
      <div className="wrap py-20 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="label text-olive">Hasat başlayınca haber ver</p>
          <h2
            id="notify-heading"
            className="mt-5 text-3xl leading-[1.1] tracking-tight md:text-4xl"
          >
            İlk hasat <em className="font-theme-display italic text-brand">kaçmasın</em>.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink/60 md:text-base">
            E-postanı bırak; hasat açılıp stoklar girince ilk sana yazalım.
            Spam yok, sadece hasat haberi.
          </p>
          <div className="mx-auto mt-8 max-w-md text-left">
            <NotifyForm />
          </div>
        </div>
      </div>
    </section>
  );
}
