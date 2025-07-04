# Emergency Reporting System

A Django-based emergency reporting system for managing and tracking emergency incidents.

## Features

- Emergency incident reporting
- Real-time incident tracking
- User management system
- Report generation and analytics

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/emergency-reporting-system.git
cd emergency-reporting-system
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- On Windows:
```bash
venv\Scripts\activate
```
- On macOS/Linux:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create a superuser:
```bash
python manage.py createsuperuser
```

7. Run the development server:
```bash
python manage.py runserver
```

## Usage

1. Navigate to `http://localhost:8000` in your web browser
2. Log in with your superuser credentials
3. Start managing emergency reports

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
