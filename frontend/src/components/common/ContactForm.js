import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import ActionButton from './ActionButton';

const initialForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

function validate(values) {
    const errors = {};

    if (!values.name.trim()) errors.name = 'Name is required';
    if (!values.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
        errors.email = 'Enter a valid email address';
    }
    if (!values.subject.trim()) errors.subject = 'Subject is required';
    if (!values.message.trim()) errors.message = 'Message is required';

    return errors;
}

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-white/80 mb-2">{label}</label>
            {children}
            {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
        </div>
    );
}

export default function ContactForm() {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const isValid = useMemo(() => Object.keys(validate(form)).length === 0, [form]);

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
        setErrors((previous) => ({ ...previous, [name]: undefined }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validate(form);

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setSubmitted(false);
            return;
        }

        setSubmitted(true);
        setErrors({});
        setForm(initialForm);
    };

    return (
        <form onSubmit={onSubmit} className="card-glass p-6 sm:p-7 space-y-5" noValidate>
            <Field label="Name" error={errors.name}>
                <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className="input-field"
                />
            </Field>

            <Field label="Email" error={errors.email}>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    className="input-field"
                />
            </Field>

            <Field label="Subject" error={errors.subject}>
                <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    placeholder="How can we help?"
                    className="input-field"
                />
            </Field>

            <Field label="Message" error={errors.message}>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder="Write your message"
                    rows="5"
                    className="input-field resize-none"
                />
            </Field>

            <div className="flex flex-wrap gap-3 items-center">
                <ActionButton type="submit" variant="primary" className="min-w-[170px]">
                    <Send size={16} />
                    Submit Message
                </ActionButton>

                {!isValid ? <p className="text-xs text-amber-200/90">Please complete all required fields.</p> : null}
            </div>

            {submitted ? (
                <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-400/25 rounded-lg px-3 py-2"
                >
                    Thanks for reaching out. Our support team will get back to you soon.
                </motion.p>
            ) : null}
        </form>
    );
}
