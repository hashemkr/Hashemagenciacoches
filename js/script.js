document.addEventListener('DOMContentLoaded', function () {
    // Existing news loading code
    const newsList = document.getElementById('news-list');

    fetch("./js/news.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Ensure the list is initially empty
            newsList.innerHTML = '';

            // Create a single <li> element
            const li = document.createElement("li");
            li.style.transition = "all 1s ease-in-out";
            li.style.opacity = "0";
            li.style.transform = "translateY(30px)";
            newsList.appendChild(li);

            // Initialize an index to cycle through articles
            let index = 0;

            // Function to update the <li> content with smooth animations
            function updateContent() {
                const article = data.articles[index];

                // Fade out current content
                li.style.opacity = "0";
                li.style.transform = "translateY(30px)";

                setTimeout(() => {
                    // Update the content dynamically
                    li.innerHTML = `
                    <img id="imgLi" src="${article.img}" alt="Imagen de noticia" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 10px;">
                    <h3 style="margin-bottom: 10px;">${article.title}</h3>
                    <p>${article.content}</p>
                    `;

                    // Smooth fade-in effect
                    li.style.opacity = "1";
                    li.style.transform = "translateY(0)";
                }, 500); // Delay matches the fade-out duration

                // Move to the next article or loop back to the start
                index = (index + 1) % data.articles.length;
            }

            // Update content immediately, then every 2 seconds
            updateContent();
            setInterval(updateContent, 3500);
        })
        .catch(error => {
            console.error('Error:', error);
            newsList.innerHTML = '<li>Error al cargar las noticias.</li>';
        });
});
