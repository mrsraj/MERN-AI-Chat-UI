function BotMessage({ text }) {
    const lines = text.split("\n");

    return (
        <div>
            {lines.map((line, index) => {
                // Section headings
                if (line.endsWith(":")) {
                    return (
                        <p key={index} className="font-semibold mt-2">
                            {line}
                        </p>
                    );
                }

                // Empty line spacing
                if (line.trim() === "") {
                    return <div key={index} className="h-2" />;
                }

                return (
                    <p key={index} className="ml-2">
                        {line}
                    </p>
                );
            })}
        </div>
    );
}

export default BotMessage;