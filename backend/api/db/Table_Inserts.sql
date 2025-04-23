USE `portal-empleos`;

-- ================================================
-- Inserts para la tabla `users`
-- ================================================
INSERT INTO users (id, user, email, password) VALUES
(1, 'rafael', 'rafael@itla.edu.do', '$2y$10$NCV2C78yUNG8iHGMDt56BOf40xbreTUpJAmCiCcJl40HU.saq3FZK'), -- rafael
(2, 'hector', 'hector@correo.com', '$2y$10$jdimLsZuDAON7PKyZFjpi.n3F4LlC8ZsWJAKLQH61YkCf.cVnOyJm'), -- hector
(3, 'test123', 'test123@correo.com', '$2y$10$5y9Xy9qQ0XZ6HPRKqE9UZu.C7gub.m2EuKKCa9OfDbZCXK5ymnLw.'), -- test123
(4, 'prueba', 'prueba@correo.com', '$2y$10$CUKmo47F3QB2e6GXUvXFH.WfvTfSP4oNb8ofYhrcoeZYNbFvT9x/.'), -- prueba
(5, 'contra', 'contra@correo.com', '$2y$10$TPqRES0BXnjrlQ9XIfsapuu9MwEKKW8GlVrCSfomJAOv4//sja7yG'); -- contra

-- ================================================
-- Inserts para la tabla `companies`
-- ================================================
INSERT INTO companies (id, user, email, address, password) VALUES
(1, 'TechGlobal', 'contacto@techglobal.com', 'Av. Independencia 123', '$2y$10$NCV2C78yUNG8iHGMDt56BOf40xbreTUpJAmCiCcJl40HU.saq3FZK'), -- rafael
(2, 'DataCorp', 'info@datacorp.net', 'Calle El Sol 456', '$2y$10$jdimLsZuDAON7PKyZFjpi.n3F4LlC8ZsWJAKLQH61YkCf.cVnOyJm'),         -- hector
(3, 'CreativeStudio', 'hr@creativestudio.org', 'Zona Colonial, Santo Domingo', '$2y$10$5y9Xy9qQ0XZ6HPRKqE9UZu.C7gub.m2EuKKCa9OfDbZCXK5ymnLw.'), -- test123
(4, 'VisualApps', 'visual@apps.com', 'Av. Winston Churchill 789', '$2y$10$CUKmo47F3QB2e6GXUvXFH.WfvTfSP4oNb8ofYhrcoeZYNbFvT9x/.'),   -- prueba
(5, 'BeeNet', 'talento@beenet.do', 'Calle Las Palmas #12, Mirador Norte', '$2y$10$TPqRES0BXnjrlQ9XIfsapuu9MwEKKW8GlVrCSfomJAOv4//sja7yG'); -- contra

-- ================================================
-- Inserts para la tabla `jobs`
-- ================================================
INSERT INTO jobs (id, title, schedule, min_salary, max_salary, company_name, company_location, company_id) VALUES
-- TechGlobal (1)
(1, 'Desarrollador Frontend', 'Tiempo completo', '35000', '45000', 'TechGlobal', 'Santo Domingo, RD', 1),
(2, 'Ingeniero DevOps', 'Tiempo completo', '50000', '65000', 'TechGlobal', 'Santo Domingo, RD', 1),
(3, 'Project Manager', 'Medio tiempo', '40000', '50000', 'TechGlobal', 'Santo Domingo, RD', 1),

-- DataCorp (2)
(4, 'Analista de Datos', 'Tiempo completo', '28000', '35000', 'DataCorp', 'Santiago, RD', 2),
(5, 'Científico de Datos', 'Remoto', '55000', '70000', 'DataCorp', 'Santiago, RD', 2),
(6, 'Especialista BI', 'Freelance', '30000', '40000', 'DataCorp', 'Santiago, RD', 2),

-- CreativeStudio (3)
(7, 'Diseñador UX/UI', 'Tiempo completo', '30000', '42000', 'CreativeStudio', 'Santo Domingo, RD', 3),
(8, 'Director de Arte', 'Medio tiempo', '25000', '35000', 'CreativeStudio', 'Santo Domingo, RD', 3),
(9, 'Ilustrador Digital', 'Freelance', '20000', '28000', 'CreativeStudio', 'Santo Domingo, RD', 3),

-- VisualApps (4)
(10, 'QA Tester', 'Tiempo completo', '28000', '35000', 'VisualApps', 'Santo Domingo, RD', 4),
(11, 'Ingeniero de Automatización', 'Tiempo completo', '45000', '55000', 'VisualApps', 'Santo Domingo, RD', 4),
(12, 'Scrum Master', 'Remoto', '40000', '50000', 'VisualApps', 'Santo Domingo, RD', 4),

-- BeeNet (5)
(13, 'Soporte Técnico', 'Turnos rotativos', '25000', '32000', 'BeeNet', 'Distrito Nacional, RD', 5),
(14, 'Administrador de Redes', 'Tiempo completo', '42000', '52000', 'BeeNet', 'Distrito Nacional, RD', 5),
(15, 'Especialista en Seguridad Informática', 'Remoto', '50000', '65000', 'BeeNet', 'Distrito Nacional, RD', 5);

-- ================================================
-- Inserts para la tabla `jobdetails`
-- ================================================
INSERT INTO jobdetails (id, job_id, description, requirements, benefits, publication_date) VALUES
-- TechGlobal (1)
(1, 1, '¡Sé parte del equipo que crea interfaces bonitas y funcionales para miles de usuarios!', 'HTML, CSS y React. Saber Tailwind es un plus.', 'Trabajo híbrido, equipo joven y café gratis.', '2025-04-20'),
(2, 2, 'Ayúdanos a mantener nuestros pipelines vivos y corriendo sin drama.', 'Experiencia con GitHub Actions, Docker y CI/CD.', 'Días libres cuando termina el sprint y cursos pagados.', '2025-04-21'),
(3, 3, 'Coordina entregas, revisa backlog y asegúrate de que todos estén alineados sin volverse locos.', 'Buen manejo de Jira, y saber decir que no con estilo.', 'Ambiente relajado, no usamos corbatas. Ni pantalón a veces.', '2025-04-22'),

-- DataCorp (2)
(4, 4, 'Nos encantan los gráficos bien hechos. Si te gusta contar historias con datos, este es tu lugar.', 'Conocimientos de SQL, Excel avanzado y algo de Python.', 'Flexibilidad horaria, laptop nueva y team buildings decentes.', '2025-04-23'),
(5, 5, 'Tenemos datos de sobra y queremos convertirlos en decisiones inteligentes. ¿Te apuntas?', 'Python, Jupyter, y pasión por contar historias con data.', 'Capacitaciones constantes y tiempo para side-projects.', '2025-04-24'),
(6, 6, 'Haz que los dashboards cobren vida y ayuden a todo el equipo a entender lo que pasa.', 'Conocer Power BI o Tableau y tener curiosidad natural.', 'Viernes flex, bono anual y after office mensuales.', '2025-04-20'),

-- CreativeStudio (3)
(7, 7, 'Tu misión: diseñar experiencias tan intuitivas que el usuario ni piense.', 'Figma, Adobe XD y gusto por el feedback constante.', 'Feedback continuo, cero micromanagement y sillas cómodas.', '2025-04-21'),
(8, 8, '¿Tienes ojo artístico y visión digital? Únete a campañas creativas y libres.', 'Adobe Illustrator, ganas de experimentar y algo de humor.', 'Creatividad libre, sin horarios estrictos ni filtros innecesarios.', '2025-04-22'),
(9, 9, 'Dibuja, colorea y dale vida a nuestras ideas en redes y medios digitales.', 'Saber usar Procreate o algo parecido. Y tener buen pulso.', 'Pago justo, entregas claras y respeto por tu estilo.', '2025-04-23'),

-- VisualApps (4)
(10, 10, 'Encuentra bugs antes que los usuarios y gana puntos con el equipo.', 'Atención al detalle, gusto por romper cosas sin romperlas.', 'Reconocimiento real, cultura colaborativa y bugs premiados.', '2025-04-24'),
(11, 11, 'Automatiza las pruebas para que nuestros desarrolladores no se olviden de dormir.', 'Conocimiento en Cypress o Selenium. Automatiza lo que repites.', 'Te dejamos romper cosas (con responsabilidad).', '2025-04-20'),
(12, 12, 'Facilita los dailys, rompe bloqueos y cuida el ambiente ágil del equipo.', 'Certificación Scrum deseada. Buena comunicación y empatía.', 'Tu voz cuenta, tu experiencia guía. Y también hay stickers.', '2025-04-21'),

-- BeeNet (5)
(13, 13, '¿Sabes resolver problemas técnicos a la primera llamada? Te necesitamos.', 'Paciencia, buena actitud y saber instalar impresoras (a veces).', 'No odiamos a los de soporte, los amamos.', '2025-04-22'),
(14, 14, 'Mantén nuestras redes vivas, seguras y rápidas como el café del viernes.', 'Experiencia con switches, firewalls y Google \'problemas de red\'.', 'Salario competitivo, VPN pagada y cero estrés con horarios.', '2025-04-23'),
(15, 15, 'Tu trabajo: evitar que hackers nos visiten. Y si vienen, que se vayan llorando.', 'Firewall, antivirus y paranoias saludables sobre ciberseguridad.', 'Cultura de mejora continua, no culpamos al usuario final.', '2025-04-24');

-- ================================================
-- Inserts para la tabla `applications`
-- ================================================
INSERT INTO applications (id, user_id, job_id) VALUES
(1, 1, 14),
(2, 1, 2),
(3, 1, 10),
(4, 2, 2),
(5, 2, 7),
(6, 3, 2),
(7, 3, 7),
(8, 4, 12),
(9, 4, 10),
(10, 4, 2),
(11, 5, 14),
(12, 5, 6),
(13, 5, 1);

-- ================================================
-- Inserts para la tabla `cv`
-- ================================================
INSERT INTO cv (id, user_id, first_name, last_name, phone, address, city, education_institution, degree_title, education_start_date, education_end_date, work_company, work_position, work_start_date, work_end_date, skills, languages, career_objective, achievements_projects, availability, linkedin_profile, `references`, cv_pdf, created_at) VALUES
(1, 1, 'Rafael', 'López', '829-123-4567', 'Av. Bolívar #45', 'Santo Domingo', 'ITLA', 'Ingeniería en Software', '2019-01-01', '2023-12-01', 'TechGlobal', 'Frontend Developer', '2022-01-01', '2024-12-01', 'React, HTML, CSS', 'Español, Inglés', 'Crecimiento profesional y aporte a proyectos innovadores.', 'Lideré un rediseño completo en mi pasantía.', 'Inmediata', 'https://linkedin.com/in/rafaellopez', 'Referencias disponibles a solicitud.', NULL, '2025-04-23'),
(2, 2, 'Héctor', 'Martínez', '849-555-9988', 'Calle Duarte #23', 'Santiago', 'UNIBE', 'Lic. en Informática', '2019-01-01', '2023-12-01', 'CreativeStudio', 'UX Designer', '2022-01-01', '2024-12-01', 'Figma, Illustrator', 'Español', 'Crecimiento profesional y aporte a proyectos innovadores.', 'Lideré un rediseño completo en mi pasantía.', 'Inmediata', 'https://linkedin.com/in/hectormartinez', 'Referencias disponibles a solicitud.', NULL, '2025-04-23'),
(3, 3, 'Camila', 'Gómez', '829-321-8765', 'Res. Las Palmas, Blq B', 'La Vega', 'PUCMM', 'Diseño Gráfico', '2019-01-01', '2023-12-01', 'BeeNet', 'QA Tester', '2022-01-01', '2024-12-01', 'Selenium, Jira', 'Español, Francés', 'Crecimiento profesional y aporte a proyectos innovadores.', 'Lideré un rediseño completo en mi pasantía.', 'Inmediata', 'https://linkedin.com/in/camilagomez', 'Referencias disponibles a solicitud.', NULL, '2025-04-23'),
(4, 4, 'Luis', 'Sánchez', '809-654-3210', 'Altos de Arroyo Hondo', 'San Cristóbal', 'UASD', 'Analista de Datos', '2019-01-01', '2023-12-01', 'DataCorp', 'Soporte Técnico', '2022-01-01', '2024-12-01', 'Redes, Soporte', 'Inglés', 'Crecimiento profesional y aporte a proyectos innovadores.', 'Lideré un rediseño completo en mi pasantía.', 'Inmediata', 'https://linkedin.com/in/luissanchez', 'Referencias disponibles a solicitud.', NULL, '2025-04-23'),
(5, 5, 'Andrea', 'Fernández', '849-777-1122', 'Ciudad Juan Bosch, Torre 3', 'San Pedro', 'INTEC', 'Ingeniería de Sistemas', '2019-01-01', '2023-12-01', 'VisualApps', 'Analista BI', '2022-01-01', '2024-12-01', 'SQL, Power BI', 'Español, Alemán', 'Crecimiento profesional y aporte a proyectos innovadores.', 'Lideré un rediseño completo en mi pasantía.', 'Inmediata', 'https://linkedin.com/in/andreafernandez', 'Referencias disponibles a solicitud.', NULL, '2025-04-23');
