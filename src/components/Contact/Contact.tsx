import "./Contact.css";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { api } from "../../api/api";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm<{
    name: string;
    phone: string;
    message: string;
  }>();

  const contactMutation = useMutation({
    mutationFn: (data: { name: string; phone: string; message: string }) =>
      api.contact(data.name, data.phone, data.message),
    onSuccess: (data) => {
      alert(data.message);
      reset();
    },
  });

  const onSubmit = (data: { name: string; phone: string; message: string }) => {
    contactMutation.mutate(data);
  };

  return (
    <section className="contact" id="contacts">
      <div className="contact-overlay"></div>
      <div className="contact-background">
        <img
          src="/contact-bg.jpg"
          alt="Background"
          className="contact-bg-image"
        />
      </div>
      <div className="contact-content">
        <div className="contact-info-section">
          <h2 className="contact-title">ЗВ'ЯЖІТЬСЯ З НАМИ:</h2>
          <div className="contact-details">
            <div className="contact-detail">
              <span className="icon-placeholder">📍</span>
              <span>вул. Гагаріна, 10, Запоріжжя</span>
            </div>
            <div className="contact-detail">
              <span className="icon-placeholder">📞</span>
              <span>+38 (061) 123-45-67</span>
            </div>
            <div className="contact-detail">
              <span className="icon-placeholder">✉️</span>
              <span>info@stimulcity.com.ua</span>
            </div>
          </div>
        </div>
        <div className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Ваше ім'я"
              className="form-input"
              {...register("name", { required: true })}
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="form-input"
              {...register("phone", { required: true })}
            />
            <textarea
              placeholder="Напишіть повідомлення..."
              className="form-textarea"
              rows={4}
              {...register("message", { required: true })}
            ></textarea>
            <button
              type="submit"
              className="btn btn-orange btn-submit"
              disabled={contactMutation.isPending}
            >
              НАДІСЛАТИ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
