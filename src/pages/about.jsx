import PageHeader from "../components/common/pageHeader";

function About() {
  return (
    <div className="container">
      <PageHeader
        title="About"
        description="Learn more about the platform and how to use it"
      />
      <div className="mt-4">
        <p>
          This website is designed to help users create, manage, and explore
          digital business cards easily and efficiently. It is fully connected
          to the <strong>"HakreU"</strong> backend server, which handles all the
          data, authentication, and card operations securely.
        </p>
        <p>
          On the homepage, you can browse through a variety of business cards.
          By clicking on a card image, you can open a detailed view that shows
          more information about the business, including contact details,
          services, and more.
        </p>
        <p>
          If you're a <strong>business user</strong>, you’ll have access to the{" "}
          <em>“My Cards”</em> section where you can create, edit, and delete
          your own business cards. If you’re currently a regular user, you can
          upgrade your account to a business user directly from the{" "}
          <em>Profile</em> page by clicking on your profile image in the top
          right corner.
        </p>
        <p>
          The platform also allows you to favorite cards, manage your personal
          profile, and enjoy a smooth and secure user experience — all powered
          by the HakreU system.
        </p>
        <p>
          We hope you enjoy using the platform. If you have any feedback or
          questions, feel free to reach out through our contact options.
        </p>
      </div>
    </div>
  );
}

export default About;
