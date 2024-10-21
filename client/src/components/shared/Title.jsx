import { Helmet } from "react-helmet-async";
const Title = ({
  title="Chatly | Chat with your friends",
  description = "Connect with your friends via chatly, and make new friends.",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};
export default Title;
