🏛️ Sistema de Gestão de Demandas Cidadãs
Este projeto é composto por um frontend em Next.js e um backend em Django, permitindo que cidadãos registrem demandas públicas (ex: buracos em vias, iluminação, esgoto aberto) e servidores públicos possam gerenciá-las

🚀 Tecnologias
Frontend: Next.js, React, TailwindCSS

Backend: Django, Django REST Framework, Djoser (auth), PostgreSQL/MySQL

Outros: JWT, Git

📦 Pré-requisitos
Node.js (v18+)

Python 3.10+

PostgreSQL/MySQL

pip e npm/yarn

🔧 Instalação
🔁 Clonar o repositório
git clone https://github.com/petrotex/Gerenciamento_de_Demanda
cd projeto-final

🖥️ Backend (Django)
Crie e ative um ambiente virtual:
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
ou
source venv/bin/activate  # Linux/macOS 
pip install -r requirements.txt

Execute as migrações e crie superusuário
python manage.py migrate
python manage.py createsuperuser

Configure no settings.py, um email real para envio
--EMAIL_HOST_USER = '@gmail.com' # Coloque um email real aqui
--EMAIL_HOST_PASSWORD = '' # Usando Gmail como o Projeto, necessário criar uma Senha de APP e coloca-la aqui para o Google Aceitar

python manage.py runserver

🌐 Frontend (Next.js)
cd ../frontend
npm install

Crie um arquivo .env.local:
NEXT_PUBLIC_API_URL=http://localhost:8000/api

npm run dev

=-=-=-=-=-=

🗃️ API
A documentação da API ficará disponível via Swagger em:

http://localhost:8000/swagger
