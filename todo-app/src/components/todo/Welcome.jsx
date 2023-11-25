import { useParams, Link } from "react-router-dom";

export default function Welcome() {
    const {userName} = useParams();
    return (
        <div className="todo-welcome">
            <h1>Welcome {userName} to Todo Application</h1>
            <div>Your Todos:  <Link to="/todos"> Go Here</Link></div>
        </div>
    );
}