from process_au_act import ProcessAuAct
from process_au_nat import ProcessAuNat
from process_au_qld import ProcessAuQld


class ProcessRun:
    _input = 'input.json'
    _output = 'data.json'

    def run(self):
        self._au_act_2016_10()
        self._au_act_2020_10()

        self._au_nat_2016_07()
        self._au_nat_2019_05()

        self._au_qld_2015_01()
        self._au_qld_2017_11()
        self._au_qld_2020_10()

    def _au_act_2016_10(self):
        processor = ProcessAuAct('au-act-2016-10', 2016, 10, 1,
                                 '', self._input, self._output)
        processor.run()

    def _au_act_2020_10(self):
        processor = ProcessAuAct('au-act-2020-10', 2020, 10, 1,
                                 '', self._input, self._output)
        processor.run()

    def _au_nat_2016_07(self):
        processor = ProcessAuNat('au-nat-2016-07', 2016, 7, 2,
                                 '2016federalelection-all-candidates-nat-30-06-924.csv',
                                 self._input, self._output)
        processor.run()

    def _au_nat_2019_05(self):
        processor = ProcessAuNat('au-nat-2019-05', 2019, 5, 18,
                                 '2019federalelection-all-candidates-nat-30-04.csv',
                                 self._input, self._output)
        processor.run()

    def _au_qld_2015_01(self):
        processor = ProcessAuQld('au-qld-2015-01', 2015, 1, 31,
                                 'publicResults.xml', self._input, self._output)
        processor.run()

    def _au_qld_2017_11(self):
        processor = ProcessAuQld('au-qld-2017-11', 2017, 11, 25,
                                 'publicResults.xml', self._input, self._output)
        processor.run()

    def _au_qld_2020_10(self):
        processor = ProcessAuQld('au-qld-2020-10', 2020, 10, 1,
                                 '', self._input, self._output)
        processor.run()


ProcessRun().run()
