function ChatLoader() {
    return (
        <div className="mb-3 flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-gray-200 flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                ></span>
                <span
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                ></span>
            </div>
        </div>
    );
}

export default ChatLoader;