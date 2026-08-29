<?php
/**
 * Art of Living Together Competition theme setup.
 */

if (!defined('ABSPATH')) {
    exit;
}

function aolt_competition_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'aolt_competition_setup');

function aolt_competition_assets() {
    $theme_version = wp_get_theme()->get('Version');

    wp_enqueue_style(
        'aolt-competition-style',
        get_stylesheet_uri(),
        array(),
        $theme_version
    );

    wp_enqueue_script(
        'aolt-competition-script',
        get_theme_file_uri('script.js'),
        array(),
        $theme_version,
        true
    );
}
add_action('wp_enqueue_scripts', 'aolt_competition_assets');

function aolt_competition_seo_data() {
    return array(
        'title' => 'Art of Living Together Drawing Competition 2026',
        'description' => 'Art of Living Together is a national drawing competition by Eire Dialogue for primary school children in Ireland, inviting young artists to explore the 2026 theme: Love.',
        'url' => home_url('/'),
        'image' => aolt_competition_image_url('hero-love-ireland.jpg'),
        'logo' => aolt_competition_image_url('art-of-living-together-logo-cropped.jpg'),
    );
}

function aolt_competition_image_url($filename) {
    $root_path = get_theme_file_path($filename);

    if (file_exists($root_path)) {
        return get_theme_file_uri($filename);
    }

    return get_theme_file_uri('assets/images/' . $filename);
}

function aolt_competition_document_title($parts) {
    $seo = aolt_competition_seo_data();
    $parts['title'] = $seo['title'];

    if (isset($parts['site'])) {
        unset($parts['site']);
    }

    return $parts;
}
add_filter('document_title_parts', 'aolt_competition_document_title');

function aolt_competition_seo_meta() {
    $seo = aolt_competition_seo_data();
    $json_ld = array(
        '@context' => 'https://schema.org',
        '@type' => 'Event',
        'name' => $seo['title'],
        'description' => $seo['description'],
        'url' => $seo['url'],
        'image' => array($seo['image']),
        'startDate' => '2026-09-21',
        'endDate' => '2026-12-05',
        'eventStatus' => 'https://schema.org/EventScheduled',
        'eventAttendanceMode' => 'https://schema.org/OfflineEventAttendanceMode',
        'organizer' => array(
            '@type' => 'Organization',
            'name' => 'Eire Dialogue',
            'url' => 'https://www.eiredialogue.ie/',
            'logo' => $seo['logo'],
        ),
        'location' => array(
            '@type' => 'Place',
            'name' => 'Eire Dialogue',
            'address' => array(
                '@type' => 'PostalAddress',
                'streetAddress' => 'Motorcity, Kylemore Rd, Inchicore',
                'addressLocality' => 'Dublin',
                'postalCode' => 'D12 TFR7',
                'addressCountry' => 'IE',
            ),
        ),
    );

    echo "\n" . '<meta name="description" content="' . esc_attr($seo['description']) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url($seo['url']) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($seo['title']) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($seo['description']) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($seo['url']) . '">' . "\n";
    echo '<meta property="og:image" content="' . esc_url($seo['image']) . '">' . "\n";
    echo '<meta property="og:site_name" content="Art of Living Together">' . "\n";
    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($seo['title']) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($seo['description']) . '">' . "\n";
    echo '<meta name="twitter:image" content="' . esc_url($seo['image']) . '">' . "\n";
    echo '<script type="application/ld+json">' . wp_json_encode($json_ld, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
}
add_action('wp_head', 'aolt_competition_seo_meta', 1);
