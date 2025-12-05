import { NextResponse } from "next/server"; 
import { NextRequest } from "next/server"; 


const mockApiBaseUrl = "https://6931239a11a8738467cd64e6.mockapi.io/api/v1/users/users";

export async function GET() {
    try {
        const response = await fetch(mockApiBaseUrl);
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch users' }, { status: response.status });
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request ){
    try {
        const body = await request.json();

    const res = await fetch(mockApiBaseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const newUser = await res.json();
    return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
    
}

