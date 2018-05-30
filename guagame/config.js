const config = {
    // player_speed: 10,
    // enemy_speed: 10,
    // player_bullet_speed: 5,
    // enemy_bullet_speed: 5,
    // cloud_speed: 3,
    // player_bullet_coolDown: 5,
    fps: 40,
    score: 0,
}

const debugObj = [

    // {
    //     module: 'player_speed',
    //     range: [1, 30],
    // }, {
    //     module: 'cloud_speed',
    //     range: [1, 10],
    // }, {
    //     module: 'player_bullet_speed',
    //     range: [1, 30],
    // }, {
    //     module: 'enemy_speed',
    //     range: [1, 20],
    // }, {
    //     module: 'player_bullet_coolDown',
    //     range: [0, 15],
    // }, {
        {module: 'fps',
        range: [10, 100],
    },
    {
        module: 'score',
        range: [0, 200]
    }
]