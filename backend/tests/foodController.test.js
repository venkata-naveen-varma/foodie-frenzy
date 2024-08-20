// Run the server before testing

const request = require("supertest")

const server_url = "http://localhost:4000"



describe('POST /api/food/add Food Item Registration API', () => {
    it('should register a new food item successfully', async () => {
        const response = await request(server_url)
            .post('/api/food/add')
            .send({
                name: 'Pizza',
                category: 'roll',
                price: 12,
                description: "Declicious food of all"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Pizza');
        expect(response.body.category).toBe('roll');
        expect(response.body.price).toBe(12);
    });

    it('should return 400 if any required field is missing', async () => {
        const response = await request(server_url)
            .post('/api/food/add')
            .send({
                name: 'Burger',
                category: 'Fast Food'
                // price is missing
            });

        expect(response.statusCode).toBe(400);
        // expect(response.text).toBe('All fields are required');
    });
});

describe("GET /api/food/list", () => {
    it("should return all food items", async () => {
        const response = await request(server_url)
        .get("/api/food/list")
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            console.log(JSON.parse(res.text));
            expect(res.statusCode).toBe(200);
        })
        return response;
    });
});
