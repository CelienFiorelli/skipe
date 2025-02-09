export const timestampFormat = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();

    if (date.toLocaleString('fr', { dateStyle: 'short' }) === today.toLocaleString('fr', { dateStyle: 'short' })) {
        return `Aujourd'hui à ${date.toLocaleString('fr', { hour12: false, hour: "2-digit", minute: "2-digit" })}`;
    } else if (date.toLocaleString('fr', { dateStyle: 'short' }) === new Date(today.getTime() - 24 * 60 * 60 * 1000).toLocaleString('fr', { dateStyle: 'short' })) {
        return `Hier à ${date.toLocaleString('fr', { hour12: false, hour: "2-digit", minute: "2-digit" })}`;
    } else {
        return date.toLocaleString('fr', { hour12: false, dateStyle: "short", timeStyle: "short" });
    }
};

export const dateFormat = (dateString: string): string => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return `${formattedDate} à ${formattedTime}`;
};