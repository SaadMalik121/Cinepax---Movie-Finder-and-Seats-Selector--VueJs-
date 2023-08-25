<template>
  <div class="contact-us-container">
    <div class="about-us">
      <h2 class="section-title">About Us</h2>
      <p class="about-text">
        We are a passionate team dedicated to providing the best movie
        experience to our audience. With a diverse selection of movies and
        state-of-the-art theaters, we strive to create unforgettable moments.
      </p>
    </div>
    <div class="contact-form">
      <h2 class="section-title">Contact Us</h2>
      <form @submit.prevent="openEmailClient">
        <label class="input-label">Name</label>
        <input
          type="text"
          class="input-field"
          placeholder="Your Name"
          v-model="name"
        />

        <label class="input-label">Subject</label>
        <input
          type="text"
          class="input-field"
          placeholder="Your Subject"
          v-model="subject"
        />

        <label class="input-label">Email</label>
        <input
          type="email"
          class="input-field"
          placeholder="Your Email"
          v-model="email"
        />

        <label class="input-label">Message</label>
        <textarea
          class="input-field"
          rows="4"
          placeholder="Your Message"
          v-model="message"
        ></textarea>

        <button type="submit" class="btn">Send Message</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
      subject: "",
    };
  },
  methods: {
    openEmailClient() {
      const subject = this.subject;
      const message = `Hello, I am ${this.name}.  ${this.message}`;

      const mailtoUrl = `mailto:admin@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(message)}`;

      window.location.href = mailtoUrl;
    },
  },
};
</script>
<style scoped>
.contact-us-container {
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 20px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.about-us {
  margin-bottom: 40px;
}

.about-text {
  font-size: 16px;
  line-height: 1.5;
}

.contact-form {
  border-top: 1px solid #333333;
  padding-top: 30px;
}

.input-label {
  font-size: 14px;
  color: #cccccc;
  margin-bottom: 5px;
  display: block;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #2c2c2c;
  border: 1px solid #333333;
  border-radius: 4px;
  color: #ffffff;
}

.input-field::placeholder {
  color: #999999;
}

.input-field:focus {
  outline: none;
  border-color: #666666;
}

.textarea-field {
  resize: vertical;
}
</style>
