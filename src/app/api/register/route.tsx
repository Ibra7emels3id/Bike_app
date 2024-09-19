import { NextResponse } from "next/server";
import { connectMongoDB } from "../../db/MongoDB";
import User from "../../models/User";
import bcrypt from 'bcrypt'


export async function POST(req) {
    try {
        // الاتصال بقاعدة بيانات MongoDB
        await connectMongoDB();

        const { first_name, last_name, email, password } = await req.json();

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }


        if (password.length < 8) {
            return NextResponse.json({ error: "Please Inter a strong Password" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            first_name,
            last_name,
            email,
            password:hashedPassword,
        });

        await newUser.save();

        return NextResponse.json({ message: "Cerate User success" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "in Not found error" },
            { status: 500 }
        );
    }
}
