import Layout from '../../components/layout/layout';
import './About.css'; // Import your CSS file for styling

const AboutPage = () => {
  const subheaderProps = {
    heading: 'About Give and Take'
  };

  return (
    <Layout subheaderProps={subheaderProps}>
      <div className='about-page'>
        <div className='about-content'>
          <h2>Our Mission</h2>
          <p>
            At Give and Take, we are dedicated to fostering a culture of collaboration and
            recognition within your organization. Our platform empowers employees to take on
            exciting challenges outside of their regular tasks, earn bounty points, and ascend
            through the tiers of recognition.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>Create and manage bounties for your team, fostering a spirit of innovation.</li>
            <li>Join interesting tasks and showcase your skills to your colleagues.</li>
            <li>
              Effortlessly track task progress and provide updates, keeping everyone in the loop.
            </li>
            <li>
              Earn bounty points and advance through tiers of recognition, including Silver, Gold,
              and Diamond.
            </li>
            <li>Get acknowledged for your outstanding contributions to the organization.</li>
            <li>Redeem cash rewards when you reach milestones in your journey.</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have any questions, suggestions, or feedback, please dont hesitate to contact our
            support team at
            <a href='mailto:contact@giveandtake.com'> contact@giveandtake.com</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
