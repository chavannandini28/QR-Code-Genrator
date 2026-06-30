/**
 * Generate expiry date based on option
 * Supported:
 * 5m  -> 5 Minutes
 * 1h  -> 1 Hour
 * 1d  -> 1 Day
 * YYYY-MM-DD -> Custom Date
 */

function getExpiryDate(option) {

    const now = new Date();

    switch (option) {

        case "5m":
            now.setMinutes(now.getMinutes() + 5);
            return now.toISOString();

        case "1h":
            now.setHours(now.getHours() + 1);
            return now.toISOString();

        case "1d":
            now.setDate(now.getDate() + 1);
            return now.toISOString();

        default:

            // Custom Date
            if (option) {

                const customDate = new Date(option);

                if (!isNaN(customDate.getTime())) {

                    return customDate.toISOString();

                }

            }

            // Default Expiry = 1 Day
            now.setDate(now.getDate() + 1);

            return now.toISOString();

    }

}

/**
 * Check whether QR is expired
 */

function isExpired(expiryDate) {

    if (!expiryDate) return false;

    const expiry = new Date(expiryDate);

    if (isNaN(expiry.getTime())) {
        return false;
    }

    return new Date() > expiry;

}

/**
 * Calculate remaining time
 */

function getRemainingTime(expiryDate) {

    const expiry = new Date(expiryDate);

    const diff = expiry.getTime() - Date.now();

    if (diff <= 0) {
        return "Expired";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    return `${days}d ${hours}h ${minutes}m`;

}

module.exports = {
    getExpiryDate,
    isExpired,
    getRemainingTime
};