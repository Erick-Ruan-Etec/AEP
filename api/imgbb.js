import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Método não permitido"
        });
    }

    try {

        const form = formidable({
            maxFiles: 1
        });

        const [fields, files] = await form.parse(req);

        const file = files.image?.[0];

        if (!file) {
            return res.status(400).json({
                error: "Nenhuma imagem enviada"
            });
        }

        const buffer = fs.readFileSync(file.filepath);

        const base64 = buffer.toString("base64");

        const formData = new FormData();

        // A chave fica SOMENTE na Vercel
        formData.append(
            "key",
            process.env.IMGBB_API_KEY
        );

        formData.append(
            "image",
            base64
        );

        const response = await fetch(
            "https://api.imgbb.com/1/upload",
            {
                method: "POST",
                headers: formData.getHeaders(),
                body: formData
            }
        );

        const data = await response.json();

        fs.unlinkSync(file.filepath);

        if (!data.success) {
            return res.status(500).json({
                error: "Erro no ImgBB"
            });
        }

        return res.status(200).json({
            success: true,
            url: data.data.url
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Erro interno"
        });

    }
}