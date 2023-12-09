import FeedbackForm from "./FeedbackForm"
function FeedbackPage() {
    return (
        <div className="h-[calc(100vh-10vh)]">
            <div className="flex my-32 justify-center  items-center">

                <FeedbackForm />
            </div>
        </div>
    )
}

export default FeedbackPage