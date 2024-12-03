const FetchWithAuth = async (url, options = {}, navigate) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    let authOptions = {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        },
    };

    let response = await fetch(url, authOptions);

    if (response.status === 401) {
        const refreshResponse = await fetch('http://localhost:8080/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
            const refreshResult = await refreshResponse.json();

            localStorage.setItem('accessToken', refreshResult.newAccessToken);
            localStorage.setItem('refreshToken', refreshResult.newRefreshToken);

            authOptions.headers.Authorization = `Bearer ${refreshResult.newAccessToken}`;
            response = await fetch(url, authOptions);
        } else {
            alert('Session expired. Please log in again.');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/login');
            throw new Error('Session expired. Please log in again.');
        }
    }

    return response;
};

export default FetchWithAuth;
