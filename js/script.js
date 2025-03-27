document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
    
    // Cambiar header al hacer scroll
    window.addEventListener('scroll', function() {
      const header = document.querySelector('header');
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Filtro de categorías en videos
    if (document.querySelector('.video-gallery')) {
      const filterButtons = document.querySelectorAll('.video-categories button');
      const videoItems = document.querySelectorAll('.video-item');
      
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Remover active de todos los botones
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Agregar active al botón clickeado
          this.classList.add('active');
          
          const filterValue = this.getAttribute('data-category');
          
          videoItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
      
      // Modal para videos
      const videoThumbnails = document.querySelectorAll('.video-thumbnail');
      const videoModal = document.querySelector('.video-modal');
      const closeModal = document.querySelector('.close-modal');
      const modalIframe = document.querySelector('.modal-content iframe');
      
      videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
          const videoId = this.parentElement.querySelector('img').src.split('/')[4];
          modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
          videoModal.classList.add('show');
        });
      });
      
      closeModal.addEventListener('click', function() {
        videoModal.classList.remove('show');
        modalIframe.src = '';
      });
      
      videoModal.addEventListener('click', function(e) {
        if (e.target === this) {
          videoModal.classList.remove('show');
          modalIframe.src = '';
        }
      });
    }
    
    // Filtro de categorías en blog
    if (document.querySelector('.blog-posts')) {
      const filterButtons = document.querySelectorAll('.blog-categories button');
      const blogPosts = document.querySelectorAll('.blog-post');
      
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Remover active de todos los botones
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Agregar active al botón clickeado
          this.classList.add('active');
          
          const filterValue = this.getAttribute('data-category');
          
          blogPosts.forEach(post => {
            if (filterValue === 'all' || post.getAttribute('data-category') === filterValue) {
              post.style.display = 'block';
            } else {
              post.style.display = 'none';
            }
          });
        });
      });
    }
    
    // Formulario de contacto que redirige a WhatsApp
    if (document.getElementById('whatsappForm')) {
      const whatsappForm = document.getElementById('whatsappForm');
      
      whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Número de WhatsApp (reemplaza con tu número)
        const phoneNumber = '3166291214';
        
        // Crear mensaje para WhatsApp
        let whatsappMessage = `Hola Sebas, soy ${name}. Quiero contactarte por: ${subject}.\n\n`;
        whatsappMessage += `Mensaje: ${message}\n\n`;
        if (email) whatsappMessage += `Email: ${email}\n`;
        if (phone) whatsappMessage += `Teléfono: ${phone}`;
        
        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Redirigir a WhatsApp
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        
        // Opcional: Resetear el formulario
        whatsappForm.reset();
      });
    }
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  });