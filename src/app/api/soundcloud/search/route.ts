import { NextRequest, NextResponse } from "next/server";
import Soundcloud from "soundcloud.ts";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'No search query given' },
        { status: 400 }
      );
    }

    const soundcloud = new Soundcloud(process.env.SOUNDCLOUD_CLIENT_ID, process.env.SOUNDCLOUD_OAUTH_TOKEN);

    const playlists = await soundcloud.playlists.search({
      q: query,
      limit: 10
    });

    return NextResponse.json({
      playlists: playlists.collection,
      message: `Found ${playlists.collection.length} tracks for ${query}`
    })

  } catch (error) {
    console.error(`Error: ${error}`);
    
    return NextResponse.json(
      { error: `Search error: ${error}` },
      { status: 500 }
    );
  }



}