import star from '../assets/icons/nucleo_icon_star-glyph12.svg'
import fade from '../assets/images/testimonial-fade.png'
import a01 from '../assets/avatars/avatar-01.png'
import a02 from '../assets/avatars/avatar-02.png'
import a03 from '../assets/avatars/avatar-03.png'
import a04 from '../assets/avatars/avatar-04.png'
import a05 from '../assets/avatars/avatar-05.png'
import a06 from '../assets/avatars/avatar-06.png'
import a07 from '../assets/avatars/avatar-07.png'
import a08 from '../assets/avatars/avatar-08.png'
import a09 from '../assets/avatars/avatar-09.png'
import a10 from '../assets/avatars/avatar-10.png'
import a11 from '../assets/avatars/avatar-11.png'
import { SectionHeader } from './ui.jsx'

/* One entry per card. Outer columns drift down, the middle one drifts up.
   Durations are per loop: roughly 20px a second, slow enough to read a card while it passes. */
const COLUMNS = [
  {
    direction: 'down',
    seconds: 48,
    reviews: [
      {
        avatar: a01,
        stars: 5,
        name: 'Marcus Bennett',
        address: '1234 Maple Lane, Springfield, IL 62704',
        quote: '"Dr. Seeam has been a tremendous support in navigating my anxiety. Her demeanor is both friendly and professional."',
      },
      {
        avatar: a02,
        stars: 5,
        name: 'Emily Carter',
        address: '88 Willow Court, Madison, WI 53703',
        quote: '"I finally have practical tools for my panic attacks. Every session leaves me calmer and more in control."',
      },
      {
        avatar: a03,
        stars: 4,
        name: 'Sophie Ramirez',
        address: '415 Ocean View Dr, San Diego, CA 92109',
        quote: '"Booking online was easy and the video sessions feel just as personal as being in the room."',
      },
      {
        avatar: a04,
        stars: 5,
        name: 'Daniel Brooks',
        address: '27 Cedar Street, Portland, OR 97205',
        quote: '"After years of putting it off, I am glad I reached out. Dr. Seeam listens without judgement and really gets it."',
      },
    ],
  },
  {
    direction: 'up',
    seconds: 58,
    reviews: [
      {
        avatar: a05,
        stars: 5,
        name: 'Ryan Mitchell',
        address: '902 Elm Avenue, Austin, TX 78704',
        quote: '"Work stress was taking over my life. The CBT techniques we practised made a real difference within weeks."',
      },
      {
        avatar: a06,
        stars: 5,
        name: 'Hannah Collins',
        address: '56 Birch Road, Burlington, VT 05401',
        quote: '"Warm, patient and incredibly insightful. I always leave feeling heard and a little lighter."',
      },
      {
        avatar: a07,
        stars: 5,
        name: 'Olivia Nguyen',
        address: '310 Harbor Blvd, Seattle, WA 98101',
        quote: '"The follow-up check-ins kept me on track. It never felt rushed, even on my hardest days."',
      },
      {
        avatar: a08,
        stars: 4,
        name: 'Chloe Anderson',
        address: '74 Sunset Terrace, Denver, CO 80203',
        quote: '"My sleep and my mood have both improved. I would recommend Dr. Seeam to anyone feeling stuck."',
      },
      {
        avatar: a01,
        stars: 5,
        name: 'Victor Hale',
        address: '19 Oak Hollow, Nashville, TN 37203',
        quote: '"My wife and I came for couples therapy. We communicate better now than we have in ten years."',
      },
    ],
  },
  {
    direction: 'down',
    seconds: 52,
    reviews: [
      {
        avatar: a09,
        stars: 5,
        name: 'Grace Whitman',
        address: '640 Lakeshore Dr, Chicago, IL 60611',
        quote: '"Confidential, kind and genuinely effective. Therapy no longer feels like something to be nervous about."',
      },
      {
        avatar: a10,
        stars: 5,
        name: 'Ethan Morales',
        address: '233 Pine Ridge Rd, Asheville, NC 28801',
        quote: '"The stress-management workshop was eye-opening. I use the breathing exercises every single day."',
      },
      {
        avatar: a11,
        stars: 5,
        name: 'Liam Foster',
        address: '12 Riverbend Way, Boise, ID 83702',
        quote: '"Dr. Seeam helped me through a difficult loss with so much compassion. I cannot thank her enough."',
      },
      {
        avatar: a04,
        stars: 4,
        name: 'Nathan Price',
        address: '505 Magnolia St, Savannah, GA 31401',
        quote: '"Clear goals, honest feedback and real progress. Easily the best decision I made this year."',
      },
    ],
  },
]

function Review({ avatar, stars, name, address, quote, hidden }) {
  return (
    <article className="review" aria-hidden={hidden || undefined}>
      <div className="review__top">
        <div className="review__stars" aria-label={`${stars} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <img
              key={i}
              className={i < stars ? undefined : 'review__star--off'}
              src={star}
              width="12"
              height="12"
              alt=""
            />
          ))}
        </div>
        <p className="review__quote">{quote}</p>
      </div>
      <div className="review__person">
        <img className="review__avatar" src={avatar} width="52" height="52" alt="" />
        <div className="review__meta">
          <span className="review__name">{name}</span>
          <span className="review__address">{address}</span>
        </div>
      </div>
    </article>
  )
}

export default function Testimonials() {
  return (
    <section className="section testimonials" id="reviews">
      <SectionHeader
        eyebrow="Client Feedback"
        title="What Our Clients Say"
        subtitle="4.9-star rating based on 127 testimonials"
      />
      <div className="testimonials__wall">
        {COLUMNS.map((col, ci) => (
          <div className="testimonials__col" key={ci}>
            {/* the list is rendered twice so the loop never shows a gap */}
            <div
              className={`testimonials__track testimonials__track--${col.direction}`}
              style={{ animationDuration: `${col.seconds}s` }}
            >
              {[0, 1].map((copy) => (
                <div className="testimonials__group" key={copy}>
                  {col.reviews.map((r) => (
                    <Review {...r} hidden={copy === 1} key={r.name} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
        <img className="testimonials__fade testimonials__fade--top" src={fade} alt="" />
        <img className="testimonials__fade testimonials__fade--bottom" src={fade} alt="" />
      </div>
    </section>
  )
}
