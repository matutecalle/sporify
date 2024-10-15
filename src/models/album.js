class Album {
    constructor(albumData) {
        this.album_type = albumData.album_type;
        this.total_tracks = albumData.total_tracks;
        this.available_markets = albumData.available_markets;
        this.external_urls = albumData.external_urls.spotify;
        this.href = albumData.href;
        this.id = albumData.id;
        this.images = albumData.images.map(img => ({
            url: img.url,
            height: img.height,
            width: img.width
        }));
        this.name = albumData.name;
        this.release_date = albumData.release_date;
        this.release_date_precision = albumData.release_date_precision;
        this.uri = albumData.uri;
        this.artists = albumData.artists.map(artist => ({
            name: artist.name,
            external_urls: artist.external_urls.spotify,
            href: artist.href,
            id: artist.id,
            uri: artist.uri
        }));
    }
}