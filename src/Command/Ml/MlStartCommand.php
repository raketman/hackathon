<?php

namespace App\Command\Ml;

use Phpml\Classification\KNearestNeighbors;
use Psr\Log\LoggerAwareTrait;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Class MlStartCommand
 * @package App\Command
 */
class MlStartCommand extends Command
{
    use LoggerAwareTrait;

    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:ml:start';

    protected function configure()
    {
        $this
            ->setDescription('запуск ml обучения')
            ->setHelp('Команда запускает http сервер')
            ->addOption('data', null, InputOption::VALUE_OPTIONAL, 'Данные для обучения')
        ;
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|void|null
     * @throws \Throwable
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $samples = [[1, 3], [1, 4], [2, 4], [3, 1], [4, 1], [4, 2]];
        $labels = ['a', 'a', 'a', 'b', 'b', 'b'];

        $classifier = new KNearestNeighbors();
        $classifier->train($samples, $labels);

        $output->writeln( $classifier->predict([3, 2]) );
    }
}