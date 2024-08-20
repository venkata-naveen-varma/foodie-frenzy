// Run the server before testing

const request = require("supertest")

const server_url = "http://localhost:4000"


describe('User Registration API', () => {

    beforeEach(() => {
        // Reset the users array before each test
        let users = [];
    });

    it('should register a new user successfully', async () => {
        const response = await request(server_url)
            .post('/api/user/register')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'securepassword'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body.user.name).toBe('John Doe');
        expect(response.body.user.email).toBe('john.doe@example.com');
        // expect(response.body.user.password).toBe('securepassword'); // password should be hashed
    });

    it('should return 400 if any required field is missing', async () => {
        const response = await request(server_url)
            .post('/api/user/register')
            .send({
                name: 'Jane Doe',
                // email is missing
                password: 'securepassword'
            });

        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('All fields are required');
    });

    it('should return 400 if email is already in use', async () => {
        // First registration
        await request(server_url)
            .post('/api/user/register')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'securepassword'
            });

        // Second registration with the same email
        const response = await request(server_url)
            .post('/api/user/register')
            .send({
                name: 'Jane Doe',
                email: 'john.doe@example.com',
                password: 'anotherpassword'
            });

        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Email is already in use');
    });

    it('should return 400 if the email format is invalid', async () => {
        const response = await request(server_url)
            .post('/api/user/register')
            .send({
                name: 'John Doe',
                email: 'invalid-email',
                password: 'securepassword'
            });

        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Invalid email format');
    });

    it('should return 400 if the password is too short', async () => {
        const response = await request(server_url)
            .post('/api/user/register')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '123' // Password is too short
            });

        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Password must be at least 6 characters long');
    });
});