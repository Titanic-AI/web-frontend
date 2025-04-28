import logo from '../assets/logo-1024-b.png';
import uhh from '../assets/UUH.mp3';

export default function LandingPage() {
  return (
    <div>
      <div className="top-banner">
        Check out our extremely successful online course on creating AI-powered web applications!
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark main-navbar">
        <div className="container">          
          <img src={logo} alt="Logo 7Up" height={'256'} />

          <audio autoplay controls loop>
            <source src={uhh} type='audio/mpeg'/>
          </audio>

        </div>
      </nav>

      <section className="hero-section">
        <div className="container text-white">
          <h1 className="mb-4">Titanic Survivor Predictor</h1>
        </div>
      </section>

      <section className="content-section">
        <div className="container text-center">
          <h2>Welcome to the Titanic Survival Predictor</h2>
          <h3 className="mb-4">Discover, Learn, and Apply!</h3>
          <p>
            Discover the power of AI with our Titanic Survival Prediction app. 
            This website allows users to explore machine learning models by predicting the survival chances of passengers from the Titanic tragedy based on key personal and travel-related details.
            You can register for an account to unlock enhanced features, such as saving your prediction history and accessing multiple models at once.
            Even without logging in, you can explore the prediction tool and see how model choices like Random Forest and Support Vector Machines perform.
            Curious about how it works or want to build your own AI-powered web app? Don’t miss our exclusive online course, proudly featured here.
            Start experimenting, learn from real data, and experience AI in action.
          </p>
        </div>
      </section>
    </div>
  );
}
