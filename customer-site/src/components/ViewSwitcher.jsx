import React from 'react';
import { LayoutGrid } from 'lucide-react';

const ViewSwitcher = () => {
    const handleSwitch = (e) => {
        // If we are on localhost, we want to go to the portal (8080)
        // If we are in production, "/" will work
        if (window.location.hostname === "localhost") {
            window.location.href = "http://localhost:8080";
        } else {
            window.location.href = "/";
        }
    };

    return (
        <button
            onClick={handleSwitch}
            className="view-switcher"
            title="Back to Selection"
            style={{ border: 'none', cursor: 'pointer' }}
        >
            <LayoutGrid size={20} />
            <span>Switch View</span>
        </button>
    );
};

export default ViewSwitcher;
