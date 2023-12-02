fn main() {
    let input = include_str!("./input/input.txt");
    println!("{:?}", part_two(input));
}

fn part_two(input: &str) -> isize {
    return input
        .split_whitespace()
        .map(|line| {
            let newlines = line
                .replace("one", "one1one")
                .replace("two", "two2two")
                .replace("three", "three3three")
                .replace("four", "four4four")
                .replace("five", "five5five")
                .replace("six", "six6six")
                .replace("seven", "seven7seven")
                .replace("eight", "eight8eight")
                .replace("nine", "nine9nine");

            let numbers: Vec<_> = newlines.chars().filter_map(|sign| sign.to_digit(10)).collect();
            let first_and_last: String = numbers.first().unwrap().to_string() + &numbers.last().unwrap().to_string();

            return first_and_last.parse::<isize>().unwrap()
        })
        .sum();
}

#[cfg(test)]
mod tests {
    use crate::part_two;

    #[test]
    fn day_one_part_two() {
        let test_input = include_str!("./input/part2-test.txt");

        let expected = 281;
        let result = part_two(test_input);
        assert_eq!(result, expected);
    }
}
