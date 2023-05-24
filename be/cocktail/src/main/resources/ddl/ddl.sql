CREATE TABLE IF NOT EXISTS `member`
(
    id                   BIGINT          NOT NULL    AUTO_INCREMENT,
    image_url            TEXT            Not NULL,
    nickname             VARCHAR(30)     NOT NULL    UNIQUE,
    email                VARCHAR(255)    NOT NULL    UNIQUE,
    password             VARCHAR(255)    NOT NULL,
    status_message       TEXT,
    created_at           TIMESTAMP       NOT NULL,
    modified_at          TIMESTAMP       NOT NULL,
    deleted              BIT             NOT NULL,

    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `regular_recipe`
(
    id                   BIGINT          NOT NULL    AUTO_INCREMENT,
    image_url            TEXT            Not NULL,
    name                 VARCHAR(255)    NOT NULL    UNIQUE,
    description          TEXT            NOT NULL,
    recipe               LONGTEXT            Not NULL,
    ingredient           TEXT            Not NULL,
    alc_vol              TINYINT         Not NULL,
    base_alc             VARCHAR(255)    Not NULL,
    created_at           TIMESTAMP       NOT NULL,
    modified_at          TIMESTAMP       NOT NULL,
    deleted              BIT             NOT NULL,

    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `custom_recipe`
(
    id                   BIGINT          NOT NULL    AUTO_INCREMENT,
    member_id            BIGINT          NOT NULL,
    image_url            TEXT            Not NULL,
    name                 VARCHAR(255)    NOT NULL    UNIQUE,
    description          TEXT            NOT NULL,
    recipe               LONGTEXT            Not NULL,
    ingredient           TEXT            Not NULL,
    created_at           TIMESTAMP       NOT NULL,
    modified_at          TIMESTAMP       NOT NULL,
    deleted              BIT             NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (member_id) REFERENCES `member`(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;