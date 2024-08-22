import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    const { authorized } = useSelector((state) => state.user);

    return (
        <main className="content-grid home">
            <section id="hero" className="full content-grid">
                <div className="hero-row">
                    <div className="hero-content">
                        <h1>Take control of your finances</h1>
                        <p>
                            Take care of you and yours at home, and we can take
                            care of your finance and pocket.
                        </p>

                        <div className="hero-actions">
                            {authorized ? (
                                <Button onClick={() => navigate("/dashboard")}>
                                    Visit Dashboard
                                </Button>
                            ) : (
                                <>
                                    <Button onClick={() => navigate("/Login")}>
                                        Login
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate("/register")}
                                    >
                                        Register
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="hero-img">
                        <img
                            src="https://picsum.photos/650/350"
                            alt="hero image"
                        />
                    </div>
                </div>
            </section>

            <section id="features" className="full content-grid">
                <div className="features-row  feature">
                    <div className="features-img">
                        <img
                            src="https://picsum.photos/650/350"
                            alt="features"
                        />
                    </div>
                    <div className="features-content">
                        <small>Features</small>
                        <h1>Manage your money with ease</h1>
                        <p>
                            We offer a range of features to help you stay on top
                            of your finances, including budgeting, expense
                            tracking, and goal setting.
                        </p>
                        <ul className="features-list">
                            <li>
                                Dashboard display and overview of your financial
                                status
                            </li>
                            <li>
                                Set monthly budgets for different categories
                            </li>
                            <li>
                                Visual financial data using charts and graphs
                            </li>
                            <li>Track your investments in various assets</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section id="benefits" className="full content-grid">
                <div className="benefits-row">
                    <div className="benefits-content">
                        <small>Benefits</small>
                        <h1>Take control of your finances</h1>
                        <p>
                            We helps you gain a clear understanding of your
                            financial situation, so you can make informed
                            decisions and achieve your financial goals.
                        </p>
                        <ul className="benefits-list">
                            <li>Reduce unnecessary spending</li>
                            <li>Reach your savings goals faster</li>
                            <li>Improve your overall financial health</li>
                        </ul>
                    </div>
                    <div className="benefits-img">
                        <img
                            src="https://picsum.photos/650/350"
                            alt="features"
                        />
                    </div>
                </div>
            </section>

            <section id="cta" className="full content-grid">
                <div className="cta-row">
                    <h1>Start your financial journey with us</h1>
                    <p>Register now and take control of your finances today.</p>
                    <Button onClick={() => navigate("/register")}>
                        Register Now
                    </Button>
                </div>
            </section>

            <section id="contact" className="full content-grid">
                <div className="contact-row">
                    <h1>Still having doubts</h1>
                    <p>
                        Please fill the from below and, We will get back to you
                        as quick as possible!
                    </p>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <Input name="name" autoComplete="false" />
                        <Input name="email" type="email" autoComplete="email" />
                        <Input
                            name="message"
                            type="text"
                            autoComplete="false"
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Home;
