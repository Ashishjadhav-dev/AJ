"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Contact() {
  const [draftRequested, setDraftRequested] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const message = String(form.get("message")).trim();
    if (!name || !message) {
      const control = event.currentTarget.elements.namedItem(
        !name ? "name" : "message",
      );
      if (
        control instanceof HTMLInputElement ||
        control instanceof HTMLTextAreaElement
      ) {
        control.setCustomValidity(
          "Enter some text before creating your draft.",
        );
        control.reportValidity();
      }
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setDraftRequested(true);
  };

  return (
    <section
      id="contact"
      className="site-wrap site-section contact-section"
      aria-labelledby="contact-heading"
    >
      <div>
        <div className="section-intro">
          <h2 id="contact-heading">Let’s connect</h2>
          <p>
            Interested in discussing frontend engineering, complex product
            development or software engineering opportunities?
          </p>
        </div>
        <a className="contact-email" href={`mailto:${profile.email}`}>
          <Mail size={19} aria-hidden />
          {profile.email}
        </a>
        <div className="hero-socials">
          <a href={profile.linkedin}>
            <Linkedin size={16} aria-hidden /> LinkedIn
          </a>
          <a href={profile.github}>
            <Github size={16} aria-hidden /> GitHub
          </a>
          <Link href="/resume">View resume</Link>
        </div>
      </div>
      <form
        className="contact-form"
        onSubmit={submit}
        onInput={(event) => {
          setDraftRequested(false);
          if (
            event.target instanceof HTMLInputElement ||
            event.target instanceof HTMLTextAreaElement
          )
            event.target.setCustomValidity("");
        }}
      >
        <div className="contact-fields">
          <label htmlFor="contact-name">
            Your name
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </label>
          <label htmlFor="contact-email">
            Email address
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
        </div>
        <label htmlFor="contact-message">
          Message
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            maxLength={5000}
          />
        </label>
        <p className="form-note">
          Opens a draft in your email app. Review it and send when you’re ready.
        </p>
        <button type="submit" className="site-button">
          Create email draft
        </button>
        <p className="form-note" role="status">
          {draftRequested
            ? `Your email app was requested. Nothing has been sent by this site. If it didn’t open, email ${profile.email} directly.`
            : ""}
        </p>
      </form>
    </section>
  );
}
