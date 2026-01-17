import styles from "./companyCarouselSection.module.css";

const companies = [
  {
    name: "NSE India",
    logo: "/logos/1.png",
  },
  {
    name: "BSE India",
    logo: "/logos/2.png",
  },
  {
    name: "Zerodha",
    logo: "/logos/3.png",
    invertColor: true,
  },
  {
    name: "Upstox",
    logo: "/logos/4.png",
  },
  {
    name: "Groww",
    logo: "/logos/5.png",
  },
  {
    name: "Angel One",
    logo: "/logos/6.png",
  },
  {
    name: "HDFC Bank",
    logo: "/logos/7.png",
  },
  {
    name: "ICICI Bank",
    logo: "/logos/8.png",
  },
  {
    name: "State Bank of India",
    logo: "/logos/9.png",
    invertColor: true,
  },
  {
    name: "Axis Bank",
    logo: "/logos/10.png",
  },
  {
    name: "Kotak Mahindra Bank",
    logo: "/logos/11.png",
    invertColor: true,
  },
  {
    name: "IDFC First Bank",
    logo: "/logos/12.png",
  },
  {
    name: "Yes Bank",
    logo: "/logos/13.png",
  },
  {
    name: "IndusInd Bank",
    logo: "/logos/14.png",
  },
  {
    name: "Federal Bank",
    logo: "/logos/15.png",
  },
  {
    name: "RBL Bank",
    logo: "/logos/16.png",
  },
  {
    name: "South Indian Bank",
    logo: "/logos/17.png",
  },
  {
    name: "Karur Vysya Bank",
    logo: "/logos/18.png",
  },
  {
    name: "City Union Bank",
    logo: "/logos/19.png",
  },
];

export default function CompanyCarouselSection() {
  const trackItems = [...companies, ...companies];

  return (
    <section className={styles.section} aria-label="Trading company logos">
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Trusted by India's Leading 
 <span> Financial Brands</span>
        </h2>
        <p className={styles.subheading}>
          Indian finance & markets brands.
        </p>

        <div className={styles.carousel}>
          <div className={`${styles.track} animate-ticker`}>
            {trackItems.map((company, idx) => (
              <div key={`${company.name}-${idx}`} className={styles.logoCard}>
                <img
                  src={company.logo}
                  alt={company.name}
                  className={styles.logo}
                  style={company.invertColor ? { filter: 'brightness(0)' } : undefined}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}