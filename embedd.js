(function () {
    const params = new URLSearchParams(window.location.search);
    const formId = params.get('formId');

    const container = document.createElement('div');
    container.id = 'testimonial-widget-container';
    document.body.appendChild(container);

    fetch(`https://yourapi.com/api/testimonials/${formId}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                container.innerHTML = 'No testimonials available.';
                return;
            }

            const testimonialsHtml = data.map(testimonial => `
        <div class="testimonial">
          <p>${testimonial.content}</p>
          <span>- ${testimonial.author}</span>
        </div>
      `).join('');

            container.innerHTML = `<div class="testimonials-list">${testimonialsHtml}</div>`;
        })
        .catch(error => {
            console.error('Error loading testimonials:', error);
            container.innerHTML = 'Error loading testimonials.';
        });
})();
