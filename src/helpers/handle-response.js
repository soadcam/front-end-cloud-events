export function handleResponse(response, history) {
    return response.text().then(text => {
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                history.push("/login");
                return null;
            }
        }
        const data = text && JSON.parse(text);
        return data;
    });
}