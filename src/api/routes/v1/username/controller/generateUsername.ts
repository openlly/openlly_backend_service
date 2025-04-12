import { Response, Request } from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { buildOpenAIQuery } from '../../../../../utils/openai/openai';

// Static username collections
const staticUsernames = {
    mystery: [
        { username: "shadowSeeker", theme: "Mystery" },
        { username: "crypticSoul", theme: "Mystery" },
        { username: "enigmaWhisper", theme: "Mystery" },
        { username: "mysteryVeil", theme: "Mystery" },
        { username: "hiddenEcho", theme: "Mystery" },
        { username: "secretKeeper", theme: "Mystery" },
        { username: "riddleWraith", theme: "Mystery" },
        { username: "phantomTide", theme: "Mystery" },
        { username: "mysticalMist", theme: "Mystery" },
        { username: "cipherShade", theme: "Mystery" }
    ],
    animals: [
        { username: "nightOwl", theme: "Animal" },
        { username: "foxWhisper", theme: "Animal" },
        { username: "wolfSpirit", theme: "Animal" },
        { username: "ravenShadow", theme: "Animal" },
        { username: "tigerPulse", theme: "Animal" },
        { username: "pantherMist", theme: "Animal" },
        { username: "eagleVision", theme: "Animal" },
        { username: "lionHeart", theme: "Animal" },
        { username: "dragonSoul", theme: "Animal" },
        { username: "owlWatcher", theme: "Animal" }
    ],
    personality: [
        { username: "dreamWeaver", theme: "Personality" },
        { username: "soulWanderer", theme: "Personality" },
        { username: "quietStorm", theme: "Personality" },
        { username: "wildDreamer", theme: "Personality" },
        { username: "gentleRebel", theme: "Personality" },
        { username: "deepThinker", theme: "Personality" },
        { username: "calmChaos", theme: "Personality" },
        { username: "lonePoet", theme: "Personality" },
        { username: "mindNomad", theme: "Personality" },
        { username: "zenRider", theme: "Personality" }
    ],
    social: [
        { username: "partyNinja", theme: "Social" },
        { username: "vibeQueen", theme: "Social" },
        { username: "socialGhost", theme: "Social" },
        { username: "crowdSurfer", theme: "Social" },
        { username: "nightRider", theme: "Social" },
        { username: "groovemaster", theme: "Social" },
        { username: "pulseKeeper", theme: "Social" },
        { username: "beatMaker", theme: "Social" },
        { username: "rhythmPulse", theme: "Social" },
        { username: "danceShadow", theme: "Social" }
    ],
    artistic: [
        { username: "colorMist", theme: "Artistic" },
        { username: "artSoul", theme: "Artistic" },
        { username: "pixelDream", theme: "Artistic" },
        { username: "brushWhisper", theme: "Artistic" },
        { username: "inkSpirit", theme: "Artistic" },
        { username: "canvasHeart", theme: "Artistic" },
        { username: "sketchMind", theme: "Artistic" },
        { username: "paintFlow", theme: "Artistic" },
        { username: "artVision", theme: "Artistic" },
        { username: "creativeEcho", theme: "Artistic" }
    ],
    short: [
        { username: "zenX", theme: "Short" },
        { username: "voidY", theme: "Short" },
        { username: "mistQ", theme: "Short" },
        { username: "echoZ", theme: "Short" },
        { username: "pulseK", theme: "Short" },
        { username: "waveR", theme: "Short" },
        { username: "flowM", theme: "Short" },
        { username: "sparkN", theme: "Short" },
        { username: "ghostP", theme: "Short" },
        { username: "moonJ", theme: "Short" }
    ],
    numbers: [
        { username: "echo42", theme: "Numbers" },
        { username: "void99", theme: "Numbers" },
        { username: "pulse23", theme: "Numbers" },
        { username: "ghost77", theme: "Numbers" },
        { username: "shadow21", theme: "Numbers" },
        { username: "spirit55", theme: "Numbers" },
        { username: "dream88", theme: "Numbers" },
        { username: "mystic11", theme: "Numbers" },
        { username: "ninja33", theme: "Numbers" },
        { username: "rebel66", theme: "Numbers" }
    ]
};

// Function to get random items from an array
function getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to get random static usernames
function getRandomStaticUsernames(count: number = 5): any[] {
    const allCategories = Object.values(staticUsernames).flat();
    return getRandomItems(allCategories, count);
}

const schema = {
    properties: {
        usernames: {
            title: "Usernames",
            type: "array",
            items: {
                type: "object",
                properties: {
                    username: { type: "string" },
                    theme: { type: "string" }
                },
                required: ["username", "theme"]
            }
        },
    },
    required: ["usernames"],
    title: "Usernames Schema",
    type: "object",
};

export default async function generateUsername(req: Request, res: Response) {
    try {
        // First, get all existing usernames from the database for uniqueness check
        const existingUsernames = await prisma.username.findMany({
            select: {
                username: true
            }
        });
        const existingUsernameSet = new Set(existingUsernames.map(u => u.username.toLowerCase()));

        // Filter static usernames to only include unused ones
        const availableStaticUsernames = Object.values(staticUsernames)
            .flat()
            .filter(item => !existingUsernameSet.has(item.username.toLowerCase()));

        // If we don't have enough static usernames available, we'll need more dynamic ones
        const staticNames = getRandomItems(availableStaticUsernames, Math.min(5, availableStaticUsernames.length));
        const dynamicNamesNeeded = 15 - staticNames.length;

        // Get dynamic usernames from OpenAI
        const response = await buildOpenAIQuery([
            {
                role: "system",
                content: `
                You are a creative assistant specializing in generating unique and memorable usernames for a social media application where users share questions and receive anonymous replies. Generate usernames across these categories:

                1. Mystery/Intrigue Theme:
                - Use words like: Shadow, Secret, Hidden, Enigma, Mystic, Veiled
                - Examples: SecretWhisperer, ShadowedThoughts, MysteriousMuse

                2. Animal-Inspired:
                - Combine animal traits with mysterious/cool elements
                - Examples: NightOwl, PhantomPanda, StealthyFox

                3. Personality-Based:
                - Focus on introvert/extrovert traits, emotions, vibes
                - Examples: QuietRebel, SoulfulDreamer, WildSpirit

                4. Party/Social:
                - Fun, energetic, social butterfly themes
                - Examples: VibeMaster, PartyPhantom, SocialNinja

                5. Abstract/Artistic:
                - Creative, artistic, imaginative themes
                - Examples: ColorWhisper, DreamCanvas, PixelPoet

                6. Short & Catchy:
                - Brief but impactful names
                - Examples: ZenX, EchoMe, VoidVibe

                Guidelines:
                - Length: 3-15 characters
                - Use alphanumeric characters
                - Make them memorable and easy to type
                - Avoid offensive language or explicit content
                - Create a mix of styles and themes
                - Occasionally add numbers (max 2 digits) if it enhances the username
                - Do not use any of these existing usernames: ${[...existingUsernameSet].join(', ')}

                Output in JSON format with usernames and their themes, following this schema:
                ${JSON.stringify(schema, null, 2)}
                `
            },
            {
                role: "user",
                content: `Generate ${dynamicNamesNeeded} unique and cool usernames across different themes.`,
            },
        ]);

        if (response instanceof Error) {
            apiResponseHandler(res, {
                statusCode: 500,
                hasError: true,
                message: response.message,
            });
            return;
        }

        // Parse the OpenAI response
        const parsedResponse = JSON.parse(response);
        
        // Combine static and dynamic usernames
        const combinedUsernames = [...staticNames, ...parsedResponse.usernames];

        // Convert usernames to lowercase and ensure uniqueness
        const processedUsernames = combinedUsernames
            .map(item => ({
                ...item,
                username: item.username.toLowerCase()
            }))
            .filter(item => !existingUsernameSet.has(item.username)); // Final uniqueness check

        // If we don't have enough unique usernames, return an error
        if (processedUsernames.length === 0) {
            apiResponseHandler(res, {
                statusCode: 400,
                hasError: true,
                message: 'Could not generate unique usernames. Please try again.',
            });
            return;
        }

        // Store in database
        try {
            await prisma.username.createMany({
                data: processedUsernames.map(item => ({
                    id: uuidv4(),
                    username: item.username
                })),
                skipDuplicates: true,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                // In case of race condition where usernames became taken
                apiResponseHandler(res, {
                    statusCode: 409,
                    hasError: true,
                    message: 'Some usernames were already taken. Please try again.',
                });
                return;
            } else {
                throw error;
            }
        }

        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
            data: {
                usernames: processedUsernames
            }
        });
    } catch (error) {
        console.error(error);
        apiResponseHandler(res, {
            statusCode: 500,
            hasError: true,
            message: 'Something went wrong',
        });
    }
}