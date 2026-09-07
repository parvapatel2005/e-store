import React from 'react'

const About = () => {
  return (
    <main className="about-page container">
      <section className="about-intro">
        <div>
          <span className="eyebrow">Our story</span>
          <h1>Shopping that feels a little more human.</h1>
        </div>
        <p>At NexCart, we believe finding what you need should be simple, accessible, and enjoyable.</p>
      </section>

      <section className="about-story">
        <div className="about-mark" aria-hidden="true">N</div>
        <div className="about-story-copy">
          <span className="about-kicker">Why NexCart exists</span>
          <h2>A trusted place for everyday discoveries.</h2>
          <p>We are committed to bringing quality products, dependable service, and a seamless shopping experience together in one place.</p>
          <p>Our goal is to create an online marketplace that adds convenience and value to everyday shopping while continuing to evolve with the needs of our customers.</p>
        </div>
      </section>

      <section className="about-values" aria-label="NexCart values">
        <div>
          <span className="value-number">01</span>
          <h2>Customer first</h2>
          <p>Every detail starts with making your experience easier.</p>
        </div>
        <div>
          <span className="value-number">02</span>
          <h2>Thoughtful choice</h2>
          <p>Useful products and reliable value, carefully brought together.</p>
        </div>
        <div>
          <span className="value-number">03</span>
          <h2>Always evolving</h2>
          <p>We keep improving so NexCart stays useful to you.</p>
        </div>
      </section>
    </main>
  )
}

export default About