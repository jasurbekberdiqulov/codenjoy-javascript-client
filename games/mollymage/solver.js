/*-
 * #%L
 * Codenjoy - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2012 - 2022 Codenjoy
 * %%
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * #L%
 */


var MollymageSolver = module.exports = {

    get: function (board) {
        /**
         * @return next hero action
         */

        var Games = require('./../../engine/games.js'); // no need to check
        var Point = require('./../../engine/point.js'); // no need to check
        var Direction = Games.require('./direction.js');
        var Element = Games.require('./elements.js');
        var Stuff = require('./../../engine/stuff.js');

        const hero = board.getHero();
        let direction = [];

        const treasures = board.getTreasureBoxes();
        const isTreasure = (hero) => {
            for(let element of treasures) {
                if (element.x === hero[0] && element.y === hero[1]) {
                    direction.push(Direction.ACT);
                    return true;
                }
            }
            return false;
        }

        const barriers = board.getBarriers();
        const isBarrier = (hero) => {
            for(let element of barriers) {
                if (element.x === hero[0] && element.y === hero[1]) {
                    direction.push(Direction.ACT);
                    return true;
                }
            }
            return false;
        }

        const futureBlasts = board.getFutureBlasts();
        const isFutureBlasts = (hero) => {
            for(let element of futureBlasts) {
                if (element.x === hero[0] && element.y === hero[1]) {
                    direction = [];
                    return true;
                }
            }
            return false;
        }

        const blasts = board.getBlasts();
        const isBlasts = (hero) => {
            for(let element of blasts) {
                if (element.x === hero[0] && element.y === hero[1]) {
                    direction = [];
                    return true;
                }
            }
            return false;
        }

        const ghosts = board.getGhosts();
        const isGhosts = (hero) => {
            for(let element of ghosts) {
                if (element.x === hero[0] && element.y === hero[1]) {
                    direction.push(Direction.ACT);
                    return true;
                }
            }
            return false;
        }

        const heroes = board.getOtherHeroes();
        const isHeros = (hero) => {
            for(let element of heroes) {
                if (element.x === hero[0] && element.y === hero[1]) {
                    direction.push(Direction.ACT);
                    return true;
                }
            }
            return false;
        }

        const potions = board.getPotions();
        const isPotions = (hero) => {
            for(let element of potions) {
                if (element.x === hero[0] && element.y === hero[1]) {
                    direction.push(Direction.ACT);
                    return true;
                }
            }
            return false;
        }

        const right = [hero.x + 1, hero.y];
        const left = [hero.x - 1, hero.y];
        const down = [hero.x, hero.y - 1];
        const up = [hero.x, hero.y + 1];

        if(!isTreasure(up) && !isBarrier(up) && !isFutureBlasts(up) && !isGhosts(up) && !isBlasts(up) && !isHeros(up) && !isPotions(up)) {
            direction.push(Direction.UP);
            return direction;
        }

        if(!isTreasure(right) && !isBarrier(right) && !isFutureBlasts(right) && !isGhosts(right) && !isBlasts(right) && !isHeros(right) && !isPotions(right)) {
            direction.push(Direction.RIGHT);
            return direction;
        }

        if(!isTreasure(down) && !isBarrier(down) && !isFutureBlasts(down) && !isGhosts(down) && !isBlasts(down) && !isHeros(down) && !isPotions(down)) {
            direction.push(Direction.DOWN);
            return direction;
        }

        if(!isTreasure(left) && !isBarrier(left) && !isFutureBlasts(left) && !isGhosts(left) && !isBlasts(left) && !isHeros(left) && !isPotions(left)) {
            direction.push(Direction.LEFT);
            return direction;
        }

        return direction;
    }
};
